import mongoose from 'mongoose';

const url = 'http://localhost:8000';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "No file uploaded" 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "File uploaded successfully",
      file: {
        id: req.file.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        url: `${url}/file/${req.file.filename}`
      }
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

// export const getImage = async (req, res) => {
//   try {
//     const filename = req.params.filename;

//     if (!filename) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Filename is required" 
//       });
//     }

//     const files = await mongoose.connection.db.collection('uploads.files').find({ filename }).toArray();
    
//     if (!files || files.length === 0) {
//       return res.status(404).json({ 
//         success: false,
//         message: "File not found" 
//       });
//     }

//     const file = files[0];
    
//     // Set appropriate headers
//     res.set('Content-Type', file.metadata.contentType);
//     res.set('Content-Disposition', `inline; filename="${file.metadata.originalName}"`);

//     // Create download stream
//     const downloadStream = gridfsBucket.openDownloadStream(file._id);
//     downloadStream.pipe(res);

//     downloadStream.on('error', (error) => {
//       console.error('Download stream error:', error);
//       return res.status(500).json({ 
//         success: false,
//         message: "File download failed",
//         error: error.message
//       });
//     });

//   } catch (error) {
//     console.error("Error retrieving image:", error);
//     return res.status(500).json({ 
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });

//   }
// }
