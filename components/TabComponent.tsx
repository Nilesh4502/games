import React, { useState } from "react";
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

interface Tab {
    id: number;
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: Tab[];
}

const TabComponent = ({ tabs }: Props) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <Box display="flex" flexDirection="row">
            <Tabs isFitted variant="enclosed">
                <TabList minWidth="100px">
                    {tabs.map((tab, index) => (
                        <Tab key={tab.id} onClick={() => handleTabClick(index)}>
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tabs.map((tab, index) => (
                        <TabPanel key={tab.id} hidden={selectedTab !== index}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default TabComponent;
