const { ROLE } = require('../data')

function canViewProject(user, project) {
    return (
        user.role === ROLE.ADMIN || project.userId === user.id
    )
}
function scopedProjects(user, project) {
    if (user.role === ROLE.ADMIN) {
        return project
    } else {
        return project.filter((project) => {
            return project.userId === user.id
        })
    }

}

module.exports = {
    canViewProject,
    scopedProjects
}