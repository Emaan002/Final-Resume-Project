const mainForm = document.getElementById('cv-form') as HTMLFormElement;

enum ValidType {
    TEXT = 'text',
    TEXT_EMP = 'text_emp',
    EMAIL = 'email',
    DIGIT = 'digit',
    PHONENO = 'phoneno',
    ANY = 'any',
}

// Element definitions
let firstnameElem = mainForm.firstname as HTMLInputElement,
    middlenameElem = mainForm.middlename as HTMLInputElement,
    lastnameElem = mainForm.lastname as HTMLInputElement,
    imageElem = mainForm.image as HTMLInputElement,
    designationElem = mainForm.designation as HTMLInputElement,
    addressElem = mainForm.address as HTMLInputElement,
    emailElem = mainForm.email as HTMLInputElement,
    phonenoElem = mainForm.phoneno as HTMLInputElement,
    summaryElem = mainForm.summary as HTMLTextAreaElement;

let nameDsp = document.getElementById('fullname_dsp') as HTMLDivElement,
    imageDsp = document.getElementById('image_dsp') as HTMLImageElement,
    phonenoDsp = document.getElementById('phoneno_dsp') as HTMLDivElement,
    emailDsp = document.getElementById('email_dsp') as HTMLDivElement,
    addressDsp = document.getElementById('address_dsp') as HTMLDivElement,
    designationDsp = document.getElementById('designation_dsp') as HTMLDivElement,
    summaryDsp = document.getElementById('summary_dsp') as HTMLDivElement,
    projectsDsp = document.getElementById('projects_dsp') as HTMLDivElement,
    achievementsDsp = document.getElementById('achievements_dsp') as HTMLDivElement,
    skillsDsp = document.getElementById('skills_dsp') as HTMLDivElement,
    educationsDsp = document.getElementById('educations_dsp') as HTMLDivElement,
    experiencesDsp = document.getElementById('experiences_dsp') as HTMLDivElement;

type AttributeData = Record<string, string>;

// Helper functions
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]): AttributeData[] => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    let tempDataArr: AttributeData[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj: AttributeData = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {
    let achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>,
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLTextAreaElement>,
        expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>,
        expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>,
        expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>,
        expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>,
        expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>,
        expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLTextAreaElement>,
        eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>,
        eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>,
        eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>,
        eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>,
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>,
        eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLTextAreaElement>,
        projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>,
        projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>,
        projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLTextAreaElement>,
        skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, ValidType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLTextAreaElement, ValidType.ANY, 'Description')));
    // Other form listeners go here...

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};

function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string): void {
    if (elemType == ValidType.TEXT && (!/^[a-zA-Z]+$/.test(elem.value) || elem.value.trim().length == 0)) {
        addErrMsg(elem, elemName);
    } else {
        removeErrMsg(elem);
    }
}

function addErrMsg(formElem: HTMLElement, formElemName: string): void {
    (formElem.nextElementSibling as HTMLElement).innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem: HTMLElement): void {
    (formElem.nextElementSibling as HTMLElement).innerHTML = "";
}

const showListData = (listData: AttributeData[], listContainer: HTMLElement): void => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};

const displayCV = (userData: any): void => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

const generateCV = (): void => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImage(): void {
    const file = imageElem.files?.[0];
    if (!file) return;

    let oFReader = new FileReader();
    oFReader.readAsDataURL(file);
    oFReader.onload = (ofEvent) => {
        imageDsp.src = ofEvent.target?.result as string;
    }
}

function printCV(): void {
    window.print();
}
