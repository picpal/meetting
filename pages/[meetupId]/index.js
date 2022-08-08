import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  // props에는 getStaticProps으로 데이터가 전달되어 있음
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://picpal:86asN64pO0dWp3IX@cluster0.ep82q6k.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // id 항목만 조회
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://picpal:86asN64pO0dWp3IX@cluster0.ep82q6k.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const seletedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  }); // id 항목만 조회
  client.close();

  return {
    props: {
      meetupData: {
        id: seletedMeetup._id.toString(),
        title: seletedMeetup.title,
        address: seletedMeetup.address,
        image: seletedMeetup.image,
        description: seletedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
