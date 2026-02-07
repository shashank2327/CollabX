import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey : "private_P8vT3foXFnsjJtFlygNX1hHW4kk=",
});



export const uploadFile = async (buffer) => {
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg"
    })

    return result;
}
