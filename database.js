let Database = {
    cindy: {
        id: 1,
        email: "cindy@gmail.com",
        password: "cindy123!",
        reminders: [{id: 1,
                    title: "abc",
                    description: "abcabc",
                    completed: false,
                    subtasks: [{id: 1001,title: "subtask1", description: "abcabc", completed: false,},
                              {id: 1002,title: "subtask2", description: "abcabc", completed: false,}]
                    },
                    {id: 2,
                     title: "abcdefg",
                     description: "abcabc",
                     completed: false,
                    }
                   ]
    },
    alex: {
        id: 2,
        email: "alex@gmail.com",
        password: "alex!",
        reminders: [{id: 2, title: "test", description: "testing", completed: false}]
    }
}

const userModel = {
    findEmail: (email) => {
        userList = Object.entries(Database)
        const user = userList.find((users) => users.find((user) => user.email === email));
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    findId: (id) => {
        userList = Object.entries(Database)
        const user = userList.find((users) => users.find((user) => user.id === id));
        if (user) {
          return user;
        }
        throw new Error(`Couldn't find user with email: ${id}`);
    },
}

module.exports = { Database, userModel };