const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

const uri = `mongodb+srv://${process.env.APP_NAME}:${process.env.APP_PASS}@mongo-app.q62fegx.mongodb.net/?retryWrites=true&w=majority&appName=mongo-app`;

// middleware
app.use(cors());
app.use(express.json());
// middleware

// tea-stall
// SyHFFiM7N48ScJFL

// mongodb
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

        const usersCollection = client.db("tea-stall").collection("users");
        const coffeesCollection = client.db("tea-stall").collection("coffee");
        const cartsCollection = client.db("tea-stall").collection("carts");

        // user section
        app.post("/users", async (req, res) => {
            const user = req.body;
            const email = user.email;
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "user already exists" })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result);
        })

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Endpoint to delete user from Firebase
        app.delete("/users/firebase/:uid", async (req, res) => {
            const { uid } = req.params;
            console.log("Attempting to delete Firebase user with UID:", uid);

            try {
                await admin.auth().deleteUser(uid);
                res.status(200).send({ message: 'User deleted from Firebase' });
            } catch (error) {
                console.error("Error deleting Firebase user:", error);
                res.status(500).send({ error: error.message });
            }
        });
        // user section

        // coffee section
        app.get("/coffee", async (req, res) => {
            const result = await coffeesCollection.find().toArray();
            res.send(result);
        })

        app.get("/coffee/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = {
                // Inculde only the 'title' and 'imdb' fields in the returned document
                projection: { coffee_name: 1, coffee_short_details: 1, coffee_details: 1, coffee_price: 1, coffee_img: 1, }
            };
            const result = await coffeesCollection.findOne(query, options);
            res.send(result);
        })
        // coffee section

        // carts
        app.post("/carts", async (req, res) => {
            const { email, coffeeName, coffeePrice } = req.body;
            try {
                // Check if the cart for the user exists
                let cart = await cartsCollection.findOne({ email });
                if (!cart) {
                    // Create a new cart if it doesn't exist
                    cart = { email, items: [] };
                }

                // Add the new coffee item to the user's cart
                cart.items.push({ coffeeName, coffeePrice });
                await cartsCollection.updateOne(
                    { email },
                    { $set: { items: cart.items } },
                    { upsert: true }
                );
                res.status(200).send({ message: 'Item added to cart' });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // Endpoint to get user's cart
        app.get("/carts/:email", async (req, res) => {
            const { email } = req.params;
            try {
                const cart = await cartsCollection.findOne({ email });
                if (cart) {
                    res.status(200).send(cart.items);
                } else {
                    res.status(404).send({ message: 'Cart not found' });
                }
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        app.get("/carts", async (req,res) => {
            const result = await cartsCollection.find().toArray();
            res.send(result);
        })
        // carts

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
// mongodb

app.get("/", (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})