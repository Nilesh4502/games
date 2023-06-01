import React from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Image, Text } from "@chakra-ui/react";
import faqData from "../data/faq.json";

const FAQAccordion = () => {
  console.log("in accordian ")
  return (
    <Accordion allowToggle>
      {faqData.faq.map((faq) => (
        <AccordionItem key={faq.id}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {faq.question}
              </Box>
              <Box flex="1" textAlign="right">
                <Image src={faq.imageUrl} alt={faq.question} boxSize="40px" borderRadius="full" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text fontSize={{ base: "sm", md: "md", lg: "lg", xl: "xl" }}>{faq.answer}</Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
