import React from "react";
import FormInput from "../Tournament/FormInput";
import DragDropFile from "../../../DragDrop/DragDropFile";

export default function TeamManagement() {
  return (
    <div className="flex flex-col gap-4">
      <FormInput
        name=""
        id="team name"
        type="text"
        label="Team Name"
        placeholder="Enter Team Name"
      />

      <FormInput
        name=""
        id="team coach"
        type="text"
        label="Team Coach"
        placeholder="Enter Coach Name"
      />

      <FormInput
        name=""
        id="team captain"
        type="text"
        label="Team Captain"
        placeholder="Enter Team Captain's Name"
      />

      <FormInput 
        name="" 
        id="email"
        type="email" 
        label="Email" 
        placeholder="Enter your email" 
      />

      <FormInput 
        name="" 
        id="phone number"
        type="number" 
        label="Phone Number" 
        placeholder="Enter Your Team's Phone Number" 
      />

      <DragDropFile 
        name=""
        accepts="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
}
