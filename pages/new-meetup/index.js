import React from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    }); // 절대경로, 상대경로 가능

    const data = await response.json();
    console.log(data);
    router.replace("/"); // 시작페이지로 이동
  };

  return (
    <>
      <Head>
        <title>장소정하기</title>
        <meta
          name="description"
          content="React application ( with NextJS ) 만남의광장 장소 추가"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetupPage;
