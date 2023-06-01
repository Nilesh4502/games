import React from "react";
import { Heading, Box, Flex } from "@chakra-ui/react";
import Header from "./../components/Header";
import TabComponent from "./../components/TabComponent";

const Dashboard = () => {
    const tabs = [
        { id: 1, title: "Tab 1", content: "Content of Tab 1" },
        { id: 2, title: "Tab 2", content: "Content of Tab 2" },
        { id: 3, title: "Tab 3", content: "Content of Tab 3" },
    ];

    return (
        <Box>
            <Header />
            <Flex justifyContent="center" alignItems="center" h="calc(100vh - 80px)">
                <Box w="70%">
                    <Heading mb={4}>Dashboard</Heading>
                    <TabComponent tabs={tabs} />
                </Box>
            </Flex>
        </Box>
    );
};

export default Dashboard;
