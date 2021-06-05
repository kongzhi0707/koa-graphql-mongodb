

const { saveInfo, fetchInfo } = require('../controller/info');
const { saveStudent, fetchStudent, fetchStudentDetail } = require('../controller/student');

const router = require('koa-router')();

router.post('/saveInfo', saveInfo);
router.get('/info', fetchInfo);

router.post('/saveStudent', saveStudent);
router.get('/student', fetchStudent);
router.get('/studentInfo', fetchStudentDetail);

module.exports = router;

