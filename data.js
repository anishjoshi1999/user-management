const ROLE = {
    ADMIN:"admin",
    BASIC:"basic"
}
module.exports = {
    ROLE:ROLE,
    users: [
        {id:1,name:"Anish Joshi",role:ROLE.ADMIN},
        {id:2,name:"Akash Shah",role:ROLE.BASIC},
        {id:3,name:"Mahendra Paudel",role:ROLE.BASIC}
    ],
    projects: [
        {id:1,name:"Anish's Project",userId:1},
        {id:2,name:"Akash's Project",userId:2},
        {id:3,name:"Mahendra's Project",userId:3}
    ]
}