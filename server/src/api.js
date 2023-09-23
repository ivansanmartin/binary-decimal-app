const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("../dbConfig");

const router = express.Router();
require("dotenv").config();

router.use(express.json());


const verifyExistProperty = (listOfProperties, comparePropertiesList) => {
    return JSON.stringify(listOfProperties) == JSON.stringify(comparePropertiesList)

}

const connectDbMongo = async () => {
    try {
        await mongoose.connect(dbConfig.url, {
            dbName: dbConfig.dbName,
        });
    } catch (error) {
        console.log(`Error connecting to MongoDB Cluster: ${error}`);
    }
};

connectDbMongo();


const userSchema = new mongoose.Schema(
    {
        id: String,
        nickname: String,
        data: [],
    },

    {
        collection: "users",
    }
);

const User = mongoose.model("User", userSchema);

router.post("/api/save-user", async (req, res) => {
    const data = req.body;

    const existProperties = verifyExistProperty(['id_auth0', 'nickname'], Object.keys(data))

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly"
        })
        return
    }

    const findExists = await User.findOne({ id: data.id_auth0 });
    console.log(findExists);

    if (findExists == null) {
        const newUserRegister = new User({
            id: data.id_auth0,
            nickname: data.nickname,
        });
        await newUserRegister.save();
        res.json({
            ok: true,
            response: "User correctly saved",
        });
    } else {
        res.json({
            USER_EXIST: "This user exist, therefore does not saved",
        });
    }
});

router.post("/api/binary-decimal/save-data", async (req, res) => {

    const data = req.body
    const date = new Date()

    const existProperties = verifyExistProperty(['id_auth0', 'binary', 'converted_decimal'], Object.keys(data))

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly"
        })
        return

    }

    await User.updateOne(
        { id:  data.id_auth0},
        {
            $push: {
                data: {
                    binary: data.binary,
                    converted_decimal: data.converted_decimal,
                    date_converted: `${date.getDate}/${date.getMonth}/${date.getFullYear}`,
                },
            },
        }
    );

    res.json({
        ok: true,
    });
});

module.exports = router;
