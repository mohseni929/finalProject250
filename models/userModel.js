const mysql = require('mysql');

/* Create a mysql pool */
const pool = mysql.createPool({
    host: 'db-mysql-tor1-88731-do-user-10154094-0.b.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'rXWCgWJcjnUwPTth',
    database: 'reminder_app',
    port: '25060',
    connectionLimit: 10
});

const userModel = {
    findEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM users WHERE email ='${email}'`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    findUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM users WHERE user_id =${user_id}`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            })
        })
    },
    addUser: (email, first_name, last_name, password) => {
        return new Promise((resolve, reject) => {
            pool.query(`insert into users (first_name, last_name, email, user_password) values ('${first_name}', '${last_name}', '${email}', '${password}')`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            })
        })
    },
    myReminders: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select
            u.user_id, u.first_name, u.last_name, u.email, r.reminder_id, r.title, r.description, r.completed, r.due_date,GROUP_CONCAT(t.tag) AS tags
            from users u
            left join reminders r on r.user_id = u.user_id
            left join tags t on t.reminder_id = r.reminder_id
            where u.user_id = ${user_id} and r.subtask_flg = false
            group by u.user_id, u.first_name, u.last_name, u.email, r.reminder_id, r.title, r.description, r.completed, r.due_date`
            , (error, results) => {
                if (error) {
                    console.log(err)
                    return reject(error);
                }
                console.log(results)
                return resolve(results)
            });
        });
    },
    friendReminders: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select
            u.user_id, u.first_name, u.last_name, u.email, r.reminder_id, r.title, r.description, r.completed, r.due_date,GROUP_CONCAT(t.tag) AS tags
            from friends f
            left join users u on f.user_id = u.user_id
            left join reminders r on r.user_id = u.user_id
            left join tags t on t.reminder_id = r.reminder_id
            where f.friend_id = ${user_id}
            group by u.user_id, u.first_name, u.last_name, u.email, r.reminder_id, r.title, r.description, r.completed, r.due_date`
            , (error, results) => {
                if (error) {
                    console.log(err)
                    return reject(error);
                }
                console.log(results)
                return resolve(results)
            });
        });
    },
    getOneReminder: (reminder_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select
            r.reminder_id, r.title, r.description, r.completed, r.due_date, r.cover, GROUP_CONCAT(t.tag) AS tags
            from reminders r
            left join tags t on t.reminder_id = r.reminder_id
            where r.reminder_id = ${reminder_id}
            group by r.reminder_id, r.title, r.description, r.completed, r.due_date, r.cover`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    getSubtasks: (reminder_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select r.reminder_id, r.title, r.description, r.completed, r.due_date, r.cover, GROUP_CONCAT(t.tag) AS tags
            from subtasks s
            left join reminders r on s.subtask_id = r.reminder_id
            left join tags t on t.reminder_id = r.reminder_id
            where s.reminder_id = ${reminder_id}
            group by r.reminder_id, r.title, r.description, r.completed, r.due_date, r.cover`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    updateReminder: (reminder_id, title, description, completed, due_date, cover) => {
        return new Promise((resolve, reject) => {
            console.log(`update reminders set
            title = '${title}',
            description = '${description}',
            completed = ${completed},
            due_date = ${due_date},
            cover = '${cover}'
            where reminder_id = ${reminder_id}`
            )
            pool.query(`update reminders set
            title = '${title}',
            description = '${description}',
            completed = ${completed},
            due_date = ${due_date},
            cover = '${cover}'
            where reminder_id = ${reminder_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    deleteTags: (reminder_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`delete from tags where reminder_id = ${reminder_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    insertTag: (reminder_id, tag) => {
        return new Promise((resolve, reject) => {
            pool.query(`insert into tags (reminder_id, tag) values (${reminder_id}, '${tag}')`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    deleteReminder: (reminder_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`delete from reminders where reminder_id = ${reminder_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    deleteSubtasks: (reminder_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`delete from subtasks where reminder_id = ${reminder_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    createReminder: (user_id, title, description, subtask_flg) => {
        return new Promise((resolve, reject) => {
            pool.query(`insert into reminders (user_id, title, description, completed, subtask_flg) values (${user_id}, '${title}', '${description}', false, ${subtask_flg})`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    getNewReminderId: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select max(reminder_id) as reminder_id from reminders where user_id = ${user_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    addSubtask: (reminder_id, subtask_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`insert into subtasks values (${reminder_id}, ${subtask_id})`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    getFriendswhoCanSeeMyReminders: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select f.friend_id, u.first_name, u.last_name, u.email
                        from friends f left join users u on f.friend_id = u.user_id
                        where f.user_id = ${user_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    getFriendsWhoShowRemindersToMe: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select f.friend_id, u.first_name, u.last_name, u.email
                        from friends f left join users u on f.user_id = u.user_id
                        where f.friend_id = ${user_id}`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    findFriend: (email) => {
        return new Promise((resolve, reject) => {
            pool.query(`select u.user_id from users u where u.email = '${email}'`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    },
    addFriend: (user_id, friend_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`insert into friends values (${user_id}, ${friend_id})`
            , (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results)
            });
        });
    }
}

module.exports = { userModel };