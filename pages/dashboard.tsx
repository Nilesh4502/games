import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { Heading, Box, Flex } from "@chakra-ui/react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";

const items = [
    {
        id: "home",
        label: "Home",
        icon: <FaHome />,
        onClick: () => console.log("Clicked Home"),
    },
    {
        id: "profile",
        label: "Profile",
        icon: <FaUser />,
        onClick: () => console.log("Clicked Profile"),
    },
    {
        id: "settings",
        label: "Settings",
        icon: <FaCog />,
        onClick: () => console.log("Clicked Settings"),
    },
];

const Dashboard = () => {
    return (
        <>
            <Header />
            <Flex>
                <Sidebar items={items} />
                <Box flex="1" p="6">
                    {/* <TabComponent /> */}
                </Box>
            </Flex>
        </>
    );
};

export default Dashboard;
