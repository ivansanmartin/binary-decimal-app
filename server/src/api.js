const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("../dbConfig");

const router = express.Router();
require("dotenv").config();

router.use(express.json());

const verifyExistProperty = (listOfProperties, comparePropertiesList) => {
    return (
        JSON.stringify(listOfProperties) ==
        JSON.stringify(comparePropertiesList)
    );
};

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
        bin_dec: [],
        dec_bin: [],
        bin_text: [],
        text_bin: [],
    },

    {
        collection: "users",
    }
);

const User = mongoose.model("User", userSchema);

router.post("/api/save-user", async (req, res) => {
    const data = req.body;

    const existProperties = verifyExistProperty(
        ["id_auth0", "nickname"],
        Object.keys(data)
    );

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly",
        });
        return;
    }

    const findExists = await User.findOne({ id: data.id_auth0 });

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
    const data = req.body;
    const existProperties = verifyExistProperty(
        ["id_auth0", "fetch"],
        Object.keys(data)
    );

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly",
        });
        return;
    }

    await User.updateOne(
        { id: data.id_auth0 },
        {
            $push: {
                bin_dec: {
                    binary: data.fetch.binary_number,
                    converted_decimal: data.fetch.decimal_convert,
                    date_converted: data.fetch.conversion_date,
                },
            },
        }
    );

    res.json({
        ok: true,
    });
});

router.post("/api/decimal-binary/save-data", async (req, res) => {
    const data = req.body;

    const existProperties = verifyExistProperty(
        ["id_auth0", "fetch"],
        Object.keys(data)
    );

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly",
        });
        return;
    }

    await User.updateOne(
        { id: data.id_auth0 },
        {
            $push: {
                dec_bin: {
                    decimal: data.fetch.decimal_number,
                    converted_binary: data.fetch.binary_convert,
                    date_converted: data.fetch.conversion_date,
                },
            },
        }
    );

    res.json({
        ok: true,
    });
});

router.post("/api/text-binary/save-data", async (req, res) => {
    const data = req.body;
    const existProperties = verifyExistProperty(
        ["id_auth0", "fetch"],
        Object.keys(data)
    );

    if (!existProperties) {
        res.status(400).json({
            ok: false,
            error: "The structure json is not correctly",
        });
        return;
    }

    await User.updateOne(
        { id: data.id_auth0 },
        {
            $push: {
                text_bin: {
                    text: data.fetch.text,
                    text_converted: data.fetch.text_converted,
                    date_converted: data.fetch.conversion_date,
                },
            },
        }
    );

    res.json({
        ok: true,
    });
});

router.post("/api/get-data", async (req, res) => {
    const search = req.body.search;
    const userId = req.body.id_auth0;

    let findData;
    switch (search) {
        case "binary":
            findData = await User.findOne({ id: userId }, { bin_dec: 1 });
            res.json(findData);

            break;

        case "decimal":
            findData = await User.findOne({ id: userId }, { dec_bin: 1 });
            res.json(findData);
            break;

        case "text_bin":
            findData = await User.findOne({ id: userId }, { text_bin: 1 });
            res.json(findData);
            break;
        default:
            return "...";
    }
});

module.exports = router;
