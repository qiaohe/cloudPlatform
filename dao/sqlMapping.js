module.exports = {
    hospital: {
        insert: 'insert Hospital set ?',
        update: 'update Hospital set ? where id=?',
        findById: 'select * from Hospital where id=?',
        findAll: 'select h.*, e.name as administratorName from Hospital h left JOIN Employee e on e.id = h.administrator order by h.createDate desc limit ?, ?'
    }
}
