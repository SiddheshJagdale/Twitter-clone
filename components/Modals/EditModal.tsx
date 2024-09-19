import useEditModal from "@/hooks/useEditModal";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const editModal = useEditModal();

  const { data: currentuser } = useCurrentUser();

  const { mutate: mutateFetchedUser } = useUser(currentuser?.id);

  useEffect(() => {
    setName(currentuser?.name);
    setUsername(currentuser?.username);
    setBio(currentuser?.bio);
    setProfileImage(currentuser?.profileImage);
    setCoverImage(currentuser?.coverImage);
  }, [
    currentuser?.name,
    currentuser?.username,
    currentuser?.bio,
    currentuser?.profileImage,
    currentuser?.coverImage,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        bio,
        coverImage,
      });
      if (response.status === 413) {
        toast.error("File size too large.");
      }
      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [
    name,
    username,
    profileImage,
    bio,
    coverImage,
    mutateFetchedUser,
    editModal,
    
  ]);

  const BodyContent = (
    <div className="flex flex-col gap-4 m-5">
      <ImageUpload
        value={profileImage}
        label="Upload Profile Image"
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        value={coverImage}
        label="Upload Cover Image"
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
    </div>
  );

  return (
    <>
      <Modal
        title="Edit details"
        actionLabel="Save"
        isOpen={editModal.isOpen}
        body={BodyContent}
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        disabled={isLoading}
        submitButton
      />
    </>
  );
};

export default EditModal;
