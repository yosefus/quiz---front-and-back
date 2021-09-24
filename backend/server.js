require('dotenv').config(); // שמירת משתנים בקובץ נפרד לוקאלי
const express = require('express'); //ייבוא של ספריית express
const app = express();
const cors = require('cors');

//  נותן לשרת להעביר בקשות ללא שגיאות אבטחה
const { connect } = require('./db');

// app.use(express.static('client')); //נותן להשתמש בlocalhost ולא רק דרך הbrowser
app.use(express.static('public')); //נותן להשתמש בlocalhost ולא רק דרך הbrowser
app.use(cors());
app.use(express.json());

connect().then(() => {
  require('./router')(app);
  app.listen(process.env.PORT); // יבוא של משתנה מקובץ env
});
