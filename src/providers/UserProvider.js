import React, { useState, createContext, useEffect  } from 'react'

const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiNjY4ODVjMmY5ODAwNmQ0YzQ4YjIiLCJpYXQiOjE1Nzk5MDI2MDB9.ur63hbTPSUo4-JsdQc7d9ldLFW-IGuJkSnRjm0mo2VE';


export const UserContext = createContext(null);

export const UserProvider = props => {

    const [user, setUser] = useState([]);



        const fetchData = async () => {
            const result = await axios(
                'https://coding-challenge-api.aerolab.co/user/me',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': token,

                    },
                }
            );
            setUser(result.data);


        };

        useEffect(() => { fetchData(); }, []);



    return (

        <UserContext.Provider value={[user, setUser]}>
            {props.children}

        </UserContext.Provider>

    );
}