import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //Function to fetch company data

    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } });

            if (data.success) {
                setCompanyData(data.company);
                //toast.success(data.message || "Company data fetched successfully");
                //console.log(data);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchJobs = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs);
                console.log(data.jobs);

            } else {
                toast.error(error.message)
            }


        } catch (error) {
            toast.error(ErrorEvent.message)
        }
    }

    const fetchUserData = async () => {
        try {

            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/users/', {
                headers: { Authorization: `Bearer ${token}` }
            });


            if (data.success) {
                setUserData(data.user)
                //toast.success('User Data Fetched Successfully')
            } else {
                toast.error(data.user)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }


    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs, showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}