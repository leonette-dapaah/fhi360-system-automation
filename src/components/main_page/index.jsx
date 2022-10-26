import { useState, useEffect } from 'react';
import logo from "../data/logo_color.png";
import { myBackgroundImage, staff, laptopBrands, laptopModels, MiFiBrands, MiFiModels, mobilePhones, projects, monitorBrands, monitorModels, dockBrands, dockModels, UPSbrands, UPSmodels, printerBrands, printerModels } from "../models";
import { TbCameraPlus } from 'react-icons/tb';
import { BsCheck2Circle, BsPlusLg } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { RiCopyrightLine } from 'react-icons/ri';
import classNames from 'classnames';
import Select from 'react-select';
import swal from 'sweetalert';

import { database, storage } from '../../firebase-config';
import { collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const InitialPage = () => {
    useEffect(() => {
        const title = document.querySelector('title');
        title.innerText = 'FHI 360 | Staff Assigned Devices';
    }, []);

    const [fullname, setFullname] = useState("");
    const [lbrand, setLbrand] = useState("");
    const [lmodel, setLmodel] = useState("");
    const [mbrand, setMbrand] = useState("");
    const [mmodel, setMmodel] = useState("");
    const [otherMifiType, setOtherMifiType] = useState("");
    const [mpbrand, setMpBrand] = useState("");
    const [mpSN, setMpSN] = useState("");
    const [otherMobilePhoneType, setOtherMobilePhoneType] = useState("");
    const [monitorBrand, setMonitorBrand] = useState("");
    const [monitorModel, setMonitorModel] = useState("");
    const [dockBrand, setDockBrand] = useState("");
    const [dockModel, setDockModel] = useState("");
    const [upsbrand, setUpsbrand] = useState("");
    const [upsModel, setUpsModel] = useState("");
    const [printerbrand, setPrinterBrand] = useState("");
    const [printerModel, setPrinterModel] = useState("");
    const [cameraType, setCameraType] = useState("");
    const [cameraSN, setCameraSN] = useState("");
    const [otherDeviceType, setOtherDeviceType] = useState("");
    const [otherDeviceSN, setOtherDeviceSN] = useState("");
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");
    const [laptopFhiTagID, setLaptopFhiTagID] = useState("");
    const [mifiFhiTagID, setMifiFhiTagID] = useState("");
    const [mpFhiTagID, setMpFhiTagID] = useState("");
    const [monitorFhiTagID, setMonitorFhiTagID] = useState("");
    const [dockFhiTagID, setDockFhiTagID] = useState("");
    const [upsFhiTagID, setUpsFhiTagID] = useState("");
    const [printerFhiTagID, setPrinterFhiTagID] = useState("");

    const style = {
        control: (base, state) => ({
          ...base,
          border: "0.6px solid #f45900",
          boxShadow: 'none',
          '&:hover': {
            border: state.isFocused && "1px solid #f45900"
          }
        })
    };

    // store uploaded photos in an array
    const [chosenPhotos, setChosenPhotos] = useState([]);
    const [, setImgUrls] = useState([]);

    const selectedImgs = (e) => {
        const chosen = e.target.files;
        // const chosenArray = Array.from(chosen);
        // console.log(chosen[0]);

        // const imgArray = chosenArray.map((file) => {
        //   return URL.createObjectURL(file);
        // });
    
        setChosenPhotos((prevImages) => prevImages.concat(Array.from(chosen)));
        e.target.value = '';
    };
    
    // display div elements when button is clicked
    const [showBlock, setShowBlock] = useState(false);
    const handleShowBlock = () => {
        setShowBlock(!showBlock);
    }

    const [showMBlock, setShowMBlock] = useState(false);
    const handleShowMBlock = () => {
        setShowMBlock(!showMBlock);
    }

    const [showMPblock, setShowMPblock] = useState(false);
    const handleShowMPblock = () => {
        setShowMPblock(!showMPblock);
    }

    const [showMonitorBlock, setShowMonitorBlock] = useState(false);
    const handleShowMonitorBlock = () => {
        setShowMonitorBlock(!showMonitorBlock);
    }
    
    const [showDockBlock, setShowDockBlock] = useState(false);
    const handleShowDockBlock = () => {
        setShowDockBlock(!showDockBlock);
    }

    const [showUPSblock, setShowUPSblock] = useState(false);
    const handleShowUPSblock = () => {
        setShowUPSblock(!showUPSblock);
    }

    const [showPblock, setShowPblock] = useState(false);
    const handleShowPblock = () => {
        setShowPblock(!showPblock);
    }
    
    const [showOtherMiFiBlock, setShowOtherMiFiBlock] = useState(false);
    const handleShowOtherMiFiBlock = () => {
        setShowOtherMiFiBlock(!showOtherMiFiBlock);
    }

    const [showOtherPhoneBlock, setShowOtherPhoneBlock] = useState(false);
    const handleShowOtherPhoneBlock = () => {
        setShowOtherPhoneBlock(!showOtherPhoneBlock);
    }

    const [showOtherProjectBlock, setShowOPblock] = useState(false);
    const handleShowOtherProjectBlock = () => {
        setShowOPblock(!showOtherProjectBlock);
    }
    
    const [showOtherNameBlock, setShowONblock] = useState(false);
    const handleShowOtherNameBlock = () => {
        setShowONblock(!showOtherNameBlock);
    }

    // upload data to the firestore database
    const addData = (e) => {
        // prevent page refresh
        e.preventDefault();

        // console.log("clicked"); // check if button has been clicked

        // add docs with auto generated ids to the fhi-staff collection of the database
        addDoc(collection(database, "fhi-staff"), {
            name: fullname,
            laptop_brand: lbrand + " " + lmodel,
            mifi_brand: mbrand + " " + mmodel,
            other_mifi: otherMifiType,
            mobile_phone_brand: mpbrand,
            other_mobile_phone: otherMobilePhoneType,
            mobile_p_sn: mpSN,
            monitor_brand: monitorBrand + " " + monitorModel,
            dockstation_brand: dockBrand + " " + dockModel,
            ups_brand: upsbrand + " " + upsModel,
            printer_brand: printerbrand + " " + printerModel,
            camera: cameraType,
            camera_sn: cameraSN,
            otherDevice: otherDeviceType,
            otherDevice_sn: otherDeviceSN,
            project: project,
            img_decr: description,
            laptop_fhiTagID: laptopFhiTagID,
            mifi_fhiTagID: mifiFhiTagID,
            mphone_fhiTagID: mpFhiTagID,
            monitor_fhiTagID: monitorFhiTagID,
            dockstation_fhiTagID: dockFhiTagID,
            ups_fhiTagID: upsFhiTagID,
            printer_fhiTagID: printerFhiTagID,
            img_urls: []
        }).then(function(docRef) {
            for(let i = 0; i < chosenPhotos.length; i++) {
                // make reference to the images
                const uploadImg = ref(storage, `fhi-images/${chosenPhotos[i].name}`);
                // upload the images to firebase
                uploadBytes(uploadImg, chosenPhotos[i])
                .then(() => {
                    getDownloadURL(uploadImg)
                        .then((imgUrls) => {
                            setImgUrls(imgUrls);
                            updateDoc(docRef, {"img_urls": arrayUnion(imgUrls)})
                        })
                        .catch(error => {
                            console.log(error.message);
                        });
                        // chosenPhotos([]);
                        alert("image uploaded");
                })
                .catch(error => {
                    console.log(error.message);
                });
            }

            swal({
                title: "Thank you!",
                text: "Your data has been stored successfully!",
                icon: "success",
                button: "Okay",
              })
        }).catch(function(error) {
            swal({
                title: "Oops!",
                text: "Something went wrong! Please try again later.",
                icon: "error",
                button: "Okay",
            })
            console.log(error);
        })

        // clear input values in the form ~ e.target.reset();
        setFullname("");
        setLbrand("");
        setLmodel("");
        setMbrand("");
        setMmodel("");
        setOtherMifiType("");
        setMpBrand("");
        setOtherMobilePhoneType("");
        setMpSN("");
        setMonitorBrand("");
        setMonitorModel("");
        setDockBrand("");
        setDockModel("");
        setUpsbrand("");
        setUpsModel("");
        setPrinterBrand("");
        setPrinterModel("");
        setCameraType("");
        setCameraSN("");
        setOtherDeviceType("");
        setOtherDeviceSN("");
        setProject("");
        setDescription("");
        setLaptopFhiTagID("");
        setMifiFhiTagID("");
        setMpFhiTagID("");
        setMonitorFhiTagID("");
        setDockFhiTagID("");
        setUpsFhiTagID("");
        setPrinterFhiTagID("");
        setChosenPhotos([]);
    }

    return ( 
        <section style={myBackgroundImage} className="px-4 py-12 md:py-24 md:p-20 grid place-items-center">
            <div className="h-full w-full fixed bottom-0 right-0 bg-black opacity-50" />
            
            <div className="relative text-black bg-white w-[95%] md:w-4/5 px-8 md:px-12 py-8">
                <div className="relative mb-8 flex justify-center md:justify-start">
                    <img src={logo} alt="fhi-logo" width={90} />
                </div>
                <div>
                    <div className="text-[32px] font-bold text-gray-800 flex justify-center md:justify-start space-x-2">
                        <h1 className="">Welcome</h1>
                        <span className="">...</span>
                    </div>
                    <div className="text-sm md:text-left font-medium text-gray-500">
                        <span>Dear FHI staff, thank you for choosing to utilize this site. Your upload will go a long way to make data collection easier!</span>
                    </div>
                    <div className="space-y-2 py-8">
                        <div className="md:grid place-items-start">
                            <h4 className="text-md font-semibold">Full Name</h4>
                            <Select options={staff} styles={style} value={staff.find(obj => obj.value === fullname)} onChange={(e) => setFullname(e.value)} className="my-1 w-full lg:w-[49%] text-start" />
                            {/* <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md my-1 w-full lg:w-[49%]" /> */}
                            <div className="md:grid place-items-start">
                            <button onClick={handleShowOtherNameBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showOtherNameBlock})} /> <p>Other</p></button>
                            {showOtherNameBlock && (
                                <div>
                                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md my-1 w-full" />
                                </div>
                            )}
                        </div>
                        </div>
                        <div className="pt-4 pb-2 font-medium text-gray-500 text-left">
                            <h2>Kindly provide details of devices assigned to you below</h2>
                        </div>
                        <div><button onClick={handleShowBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showBlock})} /> <p>Laptop</p> </button></div>
                        {showBlock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Laptop Brand</h4>
                                    <Select options={laptopBrands} styles={style} value={laptopBrands.find(obj => obj.value === lbrand)} onChange={(e) => setLbrand(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Laptop Model</h4>
                                    <Select options={laptopModels} styles={style} value={laptopModels.find(obj => obj.value === lmodel)} onChange={(e) => setLmodel(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={laptopFhiTagID} onChange={(e) => setLaptopFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowMBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showMBlock})} /> <p>MiFi/Router</p></button></div>
                        {showMBlock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Mi-Fi Brand</h4>
                                    <Select options={MiFiBrands} styles={style} value={MiFiBrands.find(obj => obj.value === mbrand)} onChange={(e) => setMbrand(e.label)} className="my-1" />
                                    <button onClick={handleShowOtherMiFiBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showOtherProjectBlock})} /> <p>Other</p></button>
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Mi-Fi Model</h4>
                                    <Select options={MiFiModels} styles={style} value={MiFiModels.find(obj => obj.value === mmodel)} onChange={(e) => setMmodel(e.label)} className="my-1" />
                                </div>
                                {showOtherMiFiBlock && (
                                    <div>
                                        <h4 className="text-md font-semibold">Mi-Fi Brand + Model</h4>
                                        <input type="text" value={otherMifiType} onChange={(e) => setOtherMifiType(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md my-1 w-full" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={mifiFhiTagID} onChange={(e) => setMifiFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowMPblock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showMPblock})} /> <p>Mobile Phone</p></button></div>
                        {showMPblock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Mobile Phone Brand</h4>
                                    <Select options={mobilePhones} styles={style} value={mobilePhones.find(obj => obj.value === mpbrand)} onChange={(e) => setMpBrand(e.label)} className="my-1" />
                                    <button onClick={handleShowOtherPhoneBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showOtherProjectBlock})} /> <p>Other</p></button>
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Mobile Phone Serial Number</h4>
                                    <input type="text" value={mpSN} onChange={(e) => setMpSN(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-[6px] rounded-md my-1 w-full" />
                                    <span className="text-sm md:text-left font-medium text-gray-500">You can type *#06# to get this serial number.</span>
                                </div>
                                {showOtherPhoneBlock && (
                                    <div>
                                        <h4 className="text-md font-semibold">Other Mobile Phone Brand + Model</h4>
                                        <input type="text" value={otherMobilePhoneType} onChange={(e) => setOtherMobilePhoneType(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md my-1 w-full" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={mpFhiTagID} onChange={(e) => setMpFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowMonitorBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showMonitorBlock})} /> <p>Monitor</p></button></div>
                        {showMonitorBlock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Monitor Brand</h4>
                                    <Select options={monitorBrands} styles={style} value={monitorBrands.find(obj => obj.value === monitorBrand)} onChange={(e) => setMonitorBrand(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Monitor Model</h4>
                                    <Select options={monitorModels} styles={style} value={monitorModels.find(obj => obj.value === monitorModel)} onChange={(e) => setMonitorModel(e.label)} className="my-1" />
                                </div>
                                <div>
                                <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={monitorFhiTagID} onChange={(e) => setMonitorFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowDockBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showDockBlock})} /> <p>Dockstation</p></button></div>
                        {showDockBlock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Dock Station Brand</h4>
                                    <Select options={dockBrands} styles={style} value={dockBrands.find(obj => obj.value === dockBrand)} onChange={(e) => setDockBrand(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Dock Station Model</h4>
                                    <Select options={dockModels} styles={style} value={dockModels.find(obj => obj.value === dockModel)} onChange={(e) => setDockModel(e.label)} className="my-1" />
                                </div>
                                <div>
                                <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={dockFhiTagID} onChange={(e) => setDockFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowUPSblock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showUPSblock})} /> <p>Uninterruptible Power Supply (UPS)</p></button></div>
                        {showUPSblock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">UPS Brand</h4>
                                    <Select options={UPSbrands} styles={style} value={UPSbrands.find(obj => obj.value === upsbrand)} onChange={(e) => setUpsbrand(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">UPS Model</h4>
                                    <Select options={UPSmodels} styles={style} value={UPSmodels.find(obj => obj.value === upsModel)} onChange={(e) => setUpsModel(e.label)} className="my-1" />
                                </div>
                                <div>
                                <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={upsFhiTagID} onChange={(e) => setUpsFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <div><button onClick={handleShowPblock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showPblock})} /> <p>Printer</p></button></div>
                        {showPblock && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                                <div>
                                    <h4 className="text-md font-semibold">Printer Brand</h4>
                                    <Select options={printerBrands} styles={style} value={printerBrands.find(obj => obj.value === printerbrand)} onChange={(e) => setPrinterBrand(e.label)} className="my-1" />
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold">Printer Model</h4>
                                    <Select options={printerModels} styles={style} value={printerModels.find(obj => obj.value === printerModel)} onChange={(e) => setPrinterModel(e.label)} className="my-1" />
                                </div>
                                <div>
                                <h4 className="text-md font-semibold">FHI Tag ID</h4>
                                    <input type="text" value={printerFhiTagID} onChange={(e) => setPrinterFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                                </div>
                            </div>
                        )}
                        <span className="text-sm md:text-left font-medium text-gray-500">If the subsequent data does not appy to you, kindly type "N/A"</span>
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-left py-4">
                            <div>
                                <h4 className="text-md font-semibold">Camera Brand + Model</h4>
                                <input type="text" value={cameraType} onChange={(e) => setCameraType(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Camera Serial Number</h4>
                                <input type="text" value={cameraSN} onChange={(e) => setCameraSN(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Other Device Brand + Model</h4>
                                <input type="text" value={otherDeviceType} onChange={(e) => setOtherDeviceType(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                            </div>
                            <div>
                                <h4 className="text-md font-semibold">Device Serial Number</h4>
                                <input type="text" value={otherDeviceSN} onChange={(e) => setOtherDeviceSN(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="grid place-items-center mb-2">
                            <h4 className="text-md font-semibold">Project</h4>
                            <Select options={projects} styles={style} value={projects.find(obj => obj.value === project)} onChange={(e) => setProject(e.label)} className="w-full lg:w-1/2 text-left" />
                        </div>
                        <div className="grid place-items-center">
                            <button onClick={handleShowOtherProjectBlock} className="text-[#f45900] font-medium flex items-center space-x-2"><BsPlusLg className={classNames("w-3", {"rotate-45 transition duration-500":showOtherProjectBlock})} /> <p>Other</p></button>
                            {showOtherProjectBlock && (
                                <div>
                                    <input type="text" value={project} onChange={(e) => setProject(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center font-medium my-1 w-full" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div className="">
                            <div className="mb-2 flex flex-col items-center">
                                <h2 className="font-bold text-xl">Image Upload</h2>
                                <span className="text-sm md:text-left font-medium text-gray-500">Kindly upload the serial number snapshots of the assigned devices</span>
                                <span className="text-sm md:text-left font-medium text-[#f45900]">We advice you select multiple images (at a go) after clicking the upload button</span>
                            </div>
                            <div className={classNames("grid place-items-center space-y-14 border-[0.6px] border-[#f45900] rounded-md", {"pt-8":chosenPhotos > 0})}>
                                <div className="images w-3/4 flex justify-center flex-row flex-wrap">
                                {chosenPhotos &&
                                    chosenPhotos.map((img) => {
                                        return (
                                            <div key={img} className="image relative mx-2 mb-8 border-2">
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    className="p-0 m-0 w-52 h-40"
                                                    alt="image_upload"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setChosenPhotos(chosenPhotos.filter((e) => e !== img))
                                                    }
                                                    className="absolute top-1 right-1 cursor-pointer border-none p-1 rounded-full bg-white"
                                                >
                                                <ImCancelCircle size={20} style={{color: "#EF0107"}} />
                                                </button>
                                            </div>
                                        );
                                })}
                                </div>
                            </div>
                            <div className="flex space-x-6 justify-center my-4">
                                <div>
                                    <button><TbCameraPlus size={28} /></button>
                                </div>
                                <div>
                                    <label
                                    htmlFor="image"
                                    className="text-white bg-[#FF4500] font-semibold rounded-[10px] px-4 py-2 my-10 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] cursor-pointer"
                                    >
                                        <input
                                            type="file"
                                            id="image"
                                            multiple
                                            accept="image/png, image/jpg, image/jpeg"
                                            onChange={selectedImgs}
                                            hidden
                                        />
                                        Upload
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-3 mt-6">
                                <h2 className="text-gray-500 font-medium">Kindly add a description for the image(s) uploaded above</h2>
                                <textarea name="" id="" cols="50" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="border-[0.6px] border-[#f45900] rounded-md p-4 w-full md:w-1/2"></textarea>
                            </div>
                        </div>
                        {/* <div className="grid place-items-center">
                            <h4 className="font-bold text-xl">FHI Tag</h4>
                            <span className="text-gray-500 text-sm font-medium">Please type in your FHI tag below</span>
                            <input type="text" value={fhiTagID} onChange={(e) => setFhiTagID(e.target.value)} className="bg-transparent border-[0.6px] border-[#f45900] p-2 rounded-md text-center text-[#f45900] font-medium my-1 lg:w-2/5 w-3/5" />
                        </div> */}
                    </div>
                </div>
                <div className="font-semibold relative float-right">
                    <button onClick={addData} className="hover:bg-[#f45900] hover:text-white text-[#f45900] border-2 border-[#f45900] rounded-[10px] px-4 py-2 my-10 flex items-center space-x-1 font-semibold relative shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"><span>Done</span> <BsCheck2Circle /></button>
                </div>
            </div>
            <div className="m-4 relative text-slate-200">
                <footer className="flex items-center space-x-2 text-sm font-medium">
                    <RiCopyrightLine />
                    <span>Developed with love by the Ghana ISS team</span>
                </footer>
            </div>
        </section>
    );
}
 
export default InitialPage;