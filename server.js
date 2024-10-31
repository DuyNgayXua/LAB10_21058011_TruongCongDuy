const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cấu hình kết nối SQL Server
const dbConfig = {
    user: 'duynx',      // Tên người dùng SQL Server
    password: 'duyngayxua',  // Mật khẩu SQL Server
    server: '127.0.0.1', // Chỉ để `localhost`
    port: 1433,        // Địa chỉ server
    database: 'Account',  // Tên database
    options: {
        encrypt: false,         // Đặt là `true` nếu bạn dùng Azure SQL hoặc yêu cầu SSL
        trustServerCertificate: true,
    }
};

// Route lấy danh sách tài khoản
app.get('/accounts', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Accounts'); // 
        res.json(result.recordset); // Trả về danh sách tài khoản dưới dạng JSON
    } catch (error) {
        res.status(500).send({ message: 'Lỗi khi lấy danh sách tài khoản', error });
    }
});
// Route lấy danh sách category
app.get('/category', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Category'); // 
        res.json(result.recordset);     
    } catch (error) {
        res.status(500).send({ message: 'Lỗi khi lấy danh sách Category', error });
    }
});

// Route lấy danh sách location
app.get('/location', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Location'); // 
        res.json(result.recordset); 
    } catch (error) {
        res.status(500).send({ message: 'Lỗi khi lấy danh sách Location', error });
    }
});


// Tạo route để thêm tài khoản mới
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        // Kiểm tra người dùng đã tồn tại
        const checkUser = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Accounts WHERE username = @username');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại' });
        }

        // Nếu chưa tồn tại, thêm tài khoản mới
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password) // Lưu ý: Cần mã hóa mật khẩu trước khi lưu vào DB
            .query('INSERT INTO Accounts (username, email, password) VALUES (@username, @email, @password)');

        res.status(201).json({ message: 'Tài khoản đã được tạo thành công' });
    } catch (error) {
        res.status(500).send({ message: 'Lỗi khi tạo tài khoản', error });
    }
});

// Xử lý đăng nhập trong API
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Accounts WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            res.json({ message: 'Đăng nhập thành công', user: result.recordset[0] });
        } else {
            res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Lỗi khi kiểm tra đăng nhập', error });
    }
});


// Khởi chạy server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);	
});
sql.connect(dbConfig)
  .then(() => console.log('Kết nối thành công với cơ sở dữ liệu'))
  .catch(err => console.log('Lỗi kết nối với cơ sở dữ liệu:', err));
