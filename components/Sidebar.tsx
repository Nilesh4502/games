import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SidebarItem {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick: () => void;
}

interface SidebarProps {
    items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
    return (
        <Box
            position="fixed"
            //top="0"
            left="0"
            bottom="0"
            w="240px"
            bg="gray.100"
            borderRightWidth="1px"
            borderRightColor="gray.200"
        >
            <Flex direction="column" h="100%" py="6" px="4">
                <VStack spacing="6" align="stretch">
                    {items.map((item) => (
                        <Box
                            key={item.id}
                            as="button"
                            p="2"
                            borderRadius="md"
                            bg="white"
                            boxShadow="sm"
                            textAlign="left"
                            onClick={item.onClick}
                            _hover={{ bg: "gray.200" }}
                            _active={{ bg: "gray.300" }}
                        >
                            <Flex align="center">
                                {item.icon && (
                                    <Box mr="2" fontSize="xl">
                                        {item.icon}
                                    </Box>
                                )}
                                <Text fontWeight="semibold">{item.label}</Text>
                            </Flex>
                        </Box>
                    ))}
                </VStack>
            </Flex>
        </Box>
    );
};

export default Sidebar;
