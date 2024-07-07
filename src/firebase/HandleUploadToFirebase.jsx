import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./FirebaseConfig";

const handleUploadImages = (files) => {
    const uploadPromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    });

    return Promise.all(uploadPromises);
};

export default handleUploadImages;