const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode'); 
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());



const connectDb = async () => {
  try {
    // await mongoose.connect('mongodb+srv://anuragpatil01978:YH0kkxAACdFuUtY3@cluster0.rpane.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();

const userSchema = new mongoose.Schema({
  userId: String,
  srNo: Number,
});
const limitSchema = new mongoose.Schema({
  subject: String,
  limit: Number,
});

const Limit = mongoose.model('Limit', limitSchema);

const models = {
  DBMSB: mongoose.model('DBMSB', userSchema, 'DBMSB'),
  FLATB: mongoose.model('FLATB', userSchema, 'FLATB'),
  DBMSA: mongoose.model('DBMSA', userSchema, 'DBMSA'),
  FLATA: mongoose.model('FLATA', userSchema, 'FLATA'),
  SoftWareA: mongoose.model('SoftWareA', userSchema, 'SoftWareA'),
  SoftWareB: mongoose.model('SoftWareB', userSchema, 'SoftWareB'),
};

const generateQRCode = async (req, res) => {
  try {
    const qrData = 'scan_this_qr';
    const qrImage = await QRCode.toDataURL(qrData);
    res.status(200).json({ qrImage });
  } catch (error) {
    res.status(500).send('Error generating QR code');
  }
};

const checkLimit = async (Model) => {
  try {
    const limitDoc = await Limit.findOne({ subject: Model.modelName });
    if (limitDoc) {
      const count = await Model.countDocuments({});
      return count >= limitDoc.limit;
    }
    return false;
  } catch (error) {
    throw new Error('Error checking limit');
  }
};

const saveScannedData = (Model) => async (req, res) => {
  const { scannedData, userId } = req.body;

  if (scannedData === 'scan_this_qr') {
    try {
      if (await checkLimit(Model)) {
        return res.status(400).send('Limit reached');
      }
      const newUser = new Model({ userId });
      await newUser.save();
      res.status(200).send(`User ID saved successfully in ${Model.modelName}`);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Error saving user ID to ${Model.modelName}`);
    }
  } else {
    res.status(400).send('Invalid QR data');
  }
};


const getUserCount = (Model) => async (req, res) => {
  try {
    const count = await Model.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error fetching user count from ${Model.modelName}`);
  }
};




const fetchAndDisplayPrnsA = async () => {
  try {
    const response = await axios.get('http://localhost:5002/prns', {
      params: { section:'A' } 
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching PRNs:', error.message);
    return [];
  }
};

const exportAttendanceA = (Model, section) => async (req, res) => {
  try {
    const users = await Model.find({ section }); 
    const prns = await fetchAndDisplayPrnsA(); 
    const filePath = path.join(__dirname, `${Model.modelName}_Attendance_${section}.xlsx`);
    let workbook;

    if (fs.existsSync(filePath)) {
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
    } else {
      workbook = new ExcelJS.Workbook();
    }

    let worksheet = workbook.getWorksheet(`${Model.modelName} Attendance`);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(`${Model.modelName} Attendance`);
      worksheet.columns = [
        { header: 'Sr No', key: 'srNo', width: 10 },
        { header: 'PRN', key: 'userId', width: 30 },
      ];
    }

    const lastColumn = worksheet.columnCount;
    const newColumn = lastColumn + 1;

    const today = new Date().toLocaleDateString();
    worksheet.getRow(1).getCell(newColumn).value = today;

    const existingPRNs = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) {
        existingPRNs.push(row.getCell(2).value); 
      }
    });

    let currentRowIndex = existingPRNs.length + 2; 
    prns.forEach((prn, index) => {
      const rowIndex = index + 2;
      worksheet.getRow(rowIndex).getCell(2).value = prn.prn; 
      worksheet.getRow(rowIndex).getCell(1).value = index + 1; 
    });

    users.forEach((user) => {
      const existingRowIndex = existingPRNs.indexOf(user.userId) + 2;
      if (existingRowIndex > 1) {
        worksheet.getRow(existingRowIndex).getCell(newColumn).value = user.userId;
      }
    });

    worksheet.columns.forEach(column => {
      column.width = 20;
    });

    await workbook.xlsx.writeFile(filePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${Model.modelName}_Attendance_${section}.xlsx`);
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(500).send(`Error exporting attendance for ${Model.modelName}`);
  }
};


const fetchAndDisplayPrnsB = async () => {
  try {
    const response = await axios.get('http://localhost:5002/prns', {
      params: { section:'B' } 
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching PRNs:', error.message);
    return [];
  }
};

const exportAttendanceB = (Model, section) => async (req, res) => {
  try {
    const users = await Model.find({ section });
    const prns = await fetchAndDisplayPrnsB();
    const filePath = path.join(__dirname, `${Model.modelName}_Attendance_${section}.xlsx`);
    let workbook;

    if (fs.existsSync(filePath)) {
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
    } else {
      workbook = new ExcelJS.Workbook();
    }

    let worksheet = workbook.getWorksheet(`${Model.modelName} Attendance`);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(`${Model.modelName} Attendance`);
      worksheet.columns = [
        { header: 'Sr No', key: 'srNo', width: 10 },
        { header: 'PRN', key: 'userId', width: 30 },
      ];
    }

    const lastColumn = worksheet.columnCount;
    const newColumn = lastColumn + 1;

    const today = new Date().toLocaleDateString();
    worksheet.getRow(1).getCell(newColumn).value = today;

    const existingPRNs = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) {
        existingPRNs.push(row.getCell(2).value);
      }
    });

    let currentRowIndex = existingPRNs.length + 2; 
    prns.forEach((prn, index) => {
      const rowIndex = index + 2;
      worksheet.getRow(rowIndex).getCell(2).value = prn.prn; 
      worksheet.getRow(rowIndex).getCell(1).value = index + 1;
    });

    users.forEach((user) => {
      const existingRowIndex = existingPRNs.indexOf(user.userId) + 2;
      if (existingRowIndex > 1) {
        worksheet.getRow(existingRowIndex).getCell(newColumn).value = user.userId;
      }
    });

    worksheet.columns.forEach(column => {
      column.width = 20;
    });

    await workbook.xlsx.writeFile(filePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${Model.modelName}_Attendance_${section}.xlsx`);
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(500).send(`Error exporting attendance for ${Model.modelName}`);
  }
};

app.delete('/clear-all', async (req, res) => {
  try {
    const collections = Object.keys(models);

    for (const collection of collections) {
      await models[collection].deleteMany({});
    }

    collections.forEach(collection => {
      const filePath = path.join(__dirname, `${collection}_Attendance.xlsx`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.status(200).send('All records and Excel files cleared');
  } catch (error) {
    res.status(500).send('Error clearing all records and files');
  }
});

app.delete('/clear-attendance/:collection', async (req, res) => {
  const { collection } = req.params;

  if (!models[collection]) {
    return res.status(400).send('Invalid collection name');
  }

  try {
    await models[collection].deleteMany({});
    res.status(200).send(`All records cleared from ${collection}`);
  } catch (error) {
    res.status(500).send(`Error clearing records from ${collection}`);
  }
});

app.post('/set-limit', async (req, res) => {
  const { subject, limit } = req.body;

  try {
    await Limit.findOneAndUpdate({ subject }, { limit }, { upsert: true });
    res.status(200).send('Limit set successfully');
  } catch (error) {
    res.status(500).send('Error setting limit');
  }
});

app.get('/dbmsb/generate-qr', generateQRCode);
app.get('/flatb/generate-qr', generateQRCode);
app.get('/softwareb/generate-qr', generateQRCode);
app.get('/dbmsa/generate-qr', generateQRCode);
app.get('/flata/generate-qr', generateQRCode);
app.get('/softwarea/generate-qr', generateQRCode);

app.post('/dbmsb/scan-qr', saveScannedData(models.DBMSB));
app.post('/flatb/scan-qr', saveScannedData(models.FLATB));
app.post('/softwareb/scan-qr', saveScannedData(models.SoftWareB));
app.post('/dbmsa/scan-qr', saveScannedData(models.DBMSA));
app.post('/flata/scan-qr', saveScannedData(models.FLATA));
app.post('/softwarea/scan-qr', saveScannedData(models.SoftWareA));

app.get('/dbmsb/get-user-count', getUserCount(models.DBMSB));
app.get('/flatb/get-user-count', getUserCount(models.FLATB));
app.get('/softwareb/get-user-count', getUserCount(models.SoftWareB));
app.get('/dbmsa/get-user-count', getUserCount(models.DBMSA));
app.get('/flata/get-user-count', getUserCount(models.FLATA));
app.get('/softwarea/get-user-count', getUserCount(models.SoftWareA));


app.get('/dbmsb/export-attendance', exportAttendanceB(models.DBMSB));
app.get('/flatb/export-attendance', exportAttendanceB(models.FLATB));
app.get('/softwareb/export-attendance', exportAttendanceB(models.SoftWareB));
app.get('/dbmsa/export-attendance', exportAttendanceA(models.DBMSA));
app.get('/flata/export-attendance', exportAttendanceA(models.FLATA ));
app.get('/softwarea/export-attendance', exportAttendanceA(models.SoftWareA));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});