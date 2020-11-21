const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("categories");
        await db.dropCollection("products");
        await db.dropCollection("users");
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [animalsCategory, propertyCategory,transportCategory] = await Category.create({
        title: "animals"
    }, {
        title: "property",
    }, {
        title: "transport"
    });

    const [judyHops, nickWilde, gideonGray] = await User.create({
        username: "Judy Hops",
        email: "judyHops@shop.com",
        password: "12345678Kk",
        phone: "0555-55-55-55",
        displayName: "Judy",
        token: nanoid()
    }, {
        username: "Nick Wilde",
        email: "nickWilde@shop.com",
        password: "12345678Kk",
        phone: "0555-55-55-55",
        displayName: "Nick",
        token: nanoid()
    }, {
        username: "Gideon Gray",
        email: "gideonGray@shop.com",
        password: "12345678Kk",
        phone: "0555-55-55-55",
        displayName: "Gray",
        token: nanoid()
    });

    await Product.create({
        title: "Фе́нек — миниатюрная лисица с крупными относительно тела ушами",
        description: "Фенек — самый маленький представитель семейства псовых, " +
            "по размерам он меньше домашней кошки. Высота в холке 18—22 см, длина тела — 30—40 см, " +
            "хвоста — до 30 см, весит фенек до 1,5 кг. Морда короткая, заострённая. Глаза большие. " +
            "Уши фенека — самые большие среди хищников по отношению к величине головы; они достигают 15 см в длину.",
        price: 3500,
        category: animalsCategory._id,
        image: "fox.jpg",
        user: judyHops._id
    }, {
        title: "Кра́сная па́нда — млекопитающее из семейства пандовых",
        description: "Длина тела примерно: 51—64 см, хвоста 28—48 см. Самцы весят около 3,7—6,2 кг, самки — 4,2—6,0 кг. " +
            "Туловище удлинённое, хвост пушистый, голова широкая, с короткой острой мордочкой и маленькими округлыми ушками. " +
            "Имеет 38 зубов. Лапы короткие, крепкие, с полувтяжными когтями, которые помогают панде легко забираться на деревья и спускаться с них.",
        price: 3000,
        category: animalsCategory._id,
        image: "panda.jpg",
        user: nickWilde._id
    }, {
        title: "Ено́ты (лат. Procyon) — род хищных млекопитающих семейства енотовых.",
        description: "Длина тела 45—60 см, хвоста 20—25 см; масса 5—9 кг. Лапы короткие, с настолько развитыми пальцами, " +
            "что следы похожи на отпечаток человеческой ладони. Енот может передними лапами захватывать и удерживать предметы, " +
            "в том числе и мыть еду. Мех у енота густой, коричневато-серый.",
        price: 2500,
        category: animalsCategory._id,
        image: "raccoon.jpg",
        user: gideonGray._id
    }, {
        title: "Lamborghini Veneno",
        description: "Максимальная скорость, которую можно достичь при движении этого автомобиля, составляет 355 км/ч. " +
            "Разгон до 100 км/ч займёт у водителя 2,5 секунды. Так что у владельцев этого чуда есть основания гордиться и " +
            "чувствовать себя особенными.",
        price: 4500500,
        category: transportCategory._id,
        image: "1.jpg",
        user: judyHops._id
    }, {
        title: "Bugatti Veyron от Masory Vivere",
        description: "Двигатель автомобиля W16, мощностью  1001 л.с. Максимальная скорость, " +
            "на которую способен автомобиль - 405 км/ч, а разгон - до 100 км за 2,5 секунды.",
        price: 3400400,
        category: transportCategory._id,
        image: "2.jpg",
        user: nickWilde._id
    }, {
        title: "Lykan Hypersport",
        description: "Двигатель автомобиля объемом 3,7 литров, максимальная скорость - 395 км/ч, разгон до сотни за 3,8 сек",
        price: 3500400,
        category: transportCategory._id,
        image: "3.jpg",
        user: gideonGray._id
    }, {
        title: "The Kayon Jungle Resort by Pramana",
        description: "Курортный отель The Kayon Jungle с открытым бассейном расположен в городе Убуд, " +
            "в окружении тропического сада. Этот отель оформлен в стиле, навеянном традиционной балийской архитектурой.",
        price: 500,
        category: propertyCategory._id,
        image: "4.jpg",
        user: judyHops._id
    }, {
        title: "Ayuterra Resort",
        description: "Курортный отель Ayuterra расположен в Убуде, в 3,3 км от местного рынка и дворца Убуд.",
        price: 400,
        category: propertyCategory._id,
        image: "5.jpg",
        user: nickWilde._id
    }, {
        title: "Madani Antique Villas by EPS",
        description: "Виллы Madani Antique Villas by EPS с садом и видом на рисовое поле и бассейн расположены в городе Убуд.",
        price: 3400,
        category: propertyCategory._id,
        image: "6.jpg",
        user: gideonGray._id
    });
    db.close();
});

