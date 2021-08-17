import React, {Fragment} from 'react';
import Accordion, { AccordionItem, AccordionTitle, AccordionContent } from "../Accordion";


const JoinTermForm = () => {
    return (
        <Fragment>
        <div className="agency-accordion max-mb-n30 mb-8">
            <Accordion>
                <AccordionItem id="one">
                    <AccordionTitle id="one">개인정보처리방침</AccordionTitle>
                    <AccordionContent id="one">Branding is more than a logo and a clever tagline. Your brand tells the story of your company. It’s your message and your values. When that happens, remarkable things occur.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <form className="mb-6">
                <label>
                    <input name="agree" type="checkbox" />동의
                </label>
            </form>
            <Accordion>
                <AccordionItem id="two">
                    <AccordionTitle id="two">이용약관</AccordionTitle>
                    <AccordionContent id="two">Branding is more than a logo and a clever tagline. Your brand tells the story of your company. It’s your message and your values. When that happens, remarkable things occur.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <form>
                <label>
                    <input name="agree" type="checkbox" />동의
                </label>
            </form>
        </div>
        <div className="col-12 text-center">
            <button className="btn btn-primary btn-hover-secondary">다음</button>
        </div>
        </Fragment>
    )
}

export default JoinTermForm;