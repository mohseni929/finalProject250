let Database = {
    cindy: {
        id: 1,
        email: "cindy@gmail.com",
        password: "cindy123!",
        reminders: [{id: 1,
                    title: "Cindy",
                    description: "Chicken Nuggets",
                    completed: false,
                    subtasks: [{id: 1001,title: "subtask1", description: "abcabc", completed: false, date: "2021-04-07"},
                              {id: 1002,title: "subtask2", description: "abcabc", completed: false, date: "2021-04-07"}],
                    date: "2021-04-07",
                    tags: ["CIT", "Term2"],
                    cover: "https://images.unsplash.com/photo-1615734028948-e377fd7688c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjM4NDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTg4MDEwNjg&ixlib=rb-1.2.1&q=80&w=1080"
                    },
                    {id: 2,
                     title: "abcdefg",
                     description: "abcabc",
                     completed: false,
                     subtasks: [],
                     date: "2021-04-07",
                     tags:["CIT", "Term1"],
                    }
                   ],
        friends: ["alex@gmail.com", "jonathan@gmail.com"]
    },

    alex: {
        id: 2,
        email: "alex@gmail.com",
        password: "alex!",
        reminders: [{id: 2, title: "Alex", description: "Soccer", completed: false, subtasks: [], tags:[]}],
        friends: ["cindy@gmail.com"]
    },

    jonathan: {
        id: 2,
        email: "jonathan@gmail.com",
        password: "alex!",
        reminders: [{id: 2, title: "Jonathan", description: "Dabbing Ninja", completed: false, subtasks: [], tags:["CIT", "ACIT2520"]}],
        friends: ["cindy@gmail.com","timmy@gmail.com"]
    },

    timmy: {
        id: 2,
        email: "timmy@gmail.com",
        password: "alex!",
        reminders: [{id: 2, title: "Timmy", description: "Watermelon", completed: false, subtasks: [], tags:[]}],
        friends: ["jonathan@gmail.com"]
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
    findFriend: (friendList) => {
        reminderList = []
        for (friend of friendList) {
            for (user of Object.values(Database)) {
                if (friend == user["email"]) {
                    reminderList.push(user["reminders"])
                }
            }
        }
        return reminderList
    }
}

module.exports = { Database, userModel };