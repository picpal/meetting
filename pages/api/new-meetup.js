import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  //POST 요청에서만 트리거
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;

    //api router는 클라이언트 쪽에서 실행이 안되기 때문에 DB정보를 기입해둠. github 올릴 때는 주의하자!!
    const client = await MongoClient.connect(
      "mongodb+srv://picpal:86asN64pO0dWp3IX@cluster0.ep82q6k.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!!" });
  }
};

export default handler;
