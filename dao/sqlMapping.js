module.exports = {
    patient: {
        insert: 'insert PatientBasicInfo set ?',
        findAll: 'select * from PatientBasicInfo',
        findByMobile: 'select * from PatientBasicInfo where mobile=?',
        findById: 'select * from PatientBasicInfo where id =?',
        updatePwd: 'update PatientBasicInfo set password = ? where mobile = ?',
        findByUid: 'select p.hospitalId, p.memberCardNo, p.memberType, p.balance, e.name as recommender, p.source, h.`name`,h.icon from Patient p INNER JOIN Hospital h on p.hospitalId=h.id LEFT JOIN Employee e on e.id = p.recommender where  p.patientBasicInfoId = ?',
        findByUidAndHospitalId: 'select p.hospitalId, p.memberCardNo, p.memberType, p.balance, e.name as recommender, p.source, h.`name`,h.icon from Patient p INNER JOIN Hospital h on p.hospitalId=h.id LEFT JOIN Employee e on e.id = p.recommender where  p.patientBasicInfoId = ? and p.hospitalId=?',
        updateById: 'update PatientBasicInfo set ? where id = ?',
        updateContact: 'update InvitationContact set ? where id =?',
        updatePatientBalance: 'update Patient set balance = balance - ? where memberCardNo=?',
        updatePerformance: 'update Performance set actualCount=actualCount+1 where businessPeopleId=? and yearMonth=?',
        findContactByInvitationCode: 'select ic.id, ic.mobile, ic.name, ic.source,iv.businessPeopleId, iv.contactId, e.hospitalId, h.name as hospitalName from Invitation iv, InvitationContact ic, Employee e, Hospital h where iv.contactId = ic.id and e.id = ic.businessPeopleId and h.id = e.hospitalId and iv.invitationCode=? and ic.mobile=?',
        findCardByHospital: 'select p.memberCardNo, p.memberType, pf.mobile, p.balance from Patient p left JOIN PatientBasicInfo pf on p.patientBasicInfoId = pf.id  where hospitalId=? and patientBasicInfoId=?'
    },
    hospital: {
        findByNameLike: 'select id, name, tag from Hospital where name like ?',
        findById: 'select id, name, tag, images, address, icon, introduction, customerServiceUid, contactMobile, contact,telephone, trafficRoute from Hospital where id = ?',
        findByIdWith: 'select id, name, icon as headPic from Hospital where id=?',
        insertPatient: 'insert Patient set ?',
        findPatientByBasicInfoId: 'select * from Patient where patientBasicInfoId = ?',
        findCustomerServiceId: 'select customerServiceUid from Hospital where id =?',
        findPatientByBasicInfoIdAndHospitalId: 'select * from Patient where patientBasicInfoId = ? and hospitalId= ?'
    }

}
