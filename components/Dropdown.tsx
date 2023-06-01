import { Button, Menu, MenuButton, MenuItem, MenuList, Link } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface DropdownOption {
    id: string;
    componentName: string;
    //role: string;
    route: string;
    title: string;
}

interface DropdownProps {
    options: DropdownOption[];
}

const Dropdown = ({ options }: DropdownProps) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Menu
            </MenuButton>
            <MenuList>
                {options.map((option) => (
                    <MenuItem key={option.id} as={Link} href={option.route}>
                        {option.title}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default Dropdown;
