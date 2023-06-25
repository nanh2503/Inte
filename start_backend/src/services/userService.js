import Blog from "../model/Blog"

/**login function */
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {

                //users already exist
                let users = await Blog.findOne({ email: email });
                if (users) {
                    if (users.password === password) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login success';
                        delete users.password;   //Ẩn password 
                        userData.users = users;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Password is not true';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "users is not found";

                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = "Your Email isn't exist in the system. Please try again!";

            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

/**check user email */
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await Blog.findOne({ email: email })
            if (users) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

/**get all users from table by id
 * if id='All' => get all users
 * if id!='All' => get one user by userId
 */
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await Blog.find({})
                if (userId && userId !== 'All') {
                    users = await Blog.findOne({
                        where: { id: userId },
                        attributes: {
                            exclude: ['password']
                        }
                    })
                }
                resolve(users)
            }

        } catch (e) {
            reject(e);
        }
    }
    )
}


/**create a new user */
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist?
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email is already used. Please try another email!'
                })

            }
            else {
                await Blog.create({
                    id: data.id,
                    email: data.email,
                    fullName: data.fullName,
                    password: data.password,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth,
                    major: data.major,
                    address: data.address,
                    phoneNum: data.phoneNum,
                    image: data.image,
                })

                resolve({
                    errCode: 0,
                    message: 'Successfully'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

/**delete user by id */
let deleteUser = (idInput) => {
    return new Promise(async (resolve, reject) => {
        let users = await Blog.findOne({ id: idInput })

        if (!users) {
            resolve({
                errCode: 2,
                errMessage: 'The users is not exist'
            })
        }

        //delete user
        await Blog.deleteOne({ id: idInput })
        resolve({
            errCode: 0,
            message: 'The users is deleted'
        })
    })
}

/**update user by id after edit */
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing requied parameters"
                })
            }
            let users = await Blog.findOne({ id: data.id })
            if (users) {
                users.email = data.email;
                users.fullName = data.fullName;
                users.gender = data.gender;
                users.dateOfBirth = data.dateOfBirth;
                users.major = data.major;
                users.address = data.address;
                users.phoneNum = data.phoneNum;
                if (data.image) {
                    users.image = data.file;
                }
                await users.save();

                resolve({
                    errCode: 0,
                    message: 'Update the users successful!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'users is not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

/**export all functions */
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}