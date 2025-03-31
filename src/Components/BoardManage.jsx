import { useState } from "react";
import PersonCard from "../Components/PersonCard";

function BoardManage(props) {
    const { type, personInfoList, onButtonClick } = props
    const today = new Date()

    /* 모달 on off를 위한 변수 */
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [personInfo, setPersonInfo] = useState(null);
    const handleAddModal = (bool) => {
        setIsAddModalOpen(bool)
    }
    const handleDeleteModal = (bool) => {
        setIsDeleteModalOpen(bool)
    }
    const minusButtonClick = (personInfo) => {
        setPersonInfo(personInfo);
        handleDeleteModal(true);
    }
    const yesButtonClick = (person) => {
        onButtonClick(person);
        handleDeleteModal(false);
    }

    function AddModal() {
        return (
            <div style={modalStyle}>
                사람추가 모달
                <button onClick={() => handleAddModal(false)}>추가</button>
                <button onClick={() => handleAddModal(false)}>취소</button>
            </div>
        )
    }

    function DeleteModal() {
        return (
            <div style={modalStyle}>
                {personInfo.userName} 직원을 삭제하시겠습니까?

                <button onClick={() => yesButtonClick(personInfo)}>예</button>
                <button onClick={() => handleDeleteModal(false)}>아니요</button>
            </div>
        )
    }

    const modalStyle = {
        position: "fixed",
        top: "35%",
        left: `${(400 - 360) / 2}px`,
        zIndex: 1000,
        width: 360,
        height: 280,
        backgroundColor: "#FFFFFF",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
    };

    return (
        <div className="box">
            <div className="box-top">
                <div>{type.name}</div>
                <div>{today.toLocaleDateString('ko-KR')}</div>
            </div>
            <div className="box-mid">
                <div className="deck">
                    {personInfoList.map((personInfo, index) => (
                        <PersonCard
                            key={index}
                            personInfo={personInfo}
                            button={type.button}
                            onButtonClick={minusButtonClick}
                        />
                    ))}
                </div>
            </div>
            <div className="box-bottom">
                <button style={{ width: "80%" }} onClick={() => handleAddModal(true)}>인원 추가</button>
            </div>
            <div className={`overlay ${isAddModalOpen || isDeleteModalOpen ? "open" : ""}`}
                onClick={() => { setIsAddModalOpen(false); setIsDeleteModalOpen(false) }}></div>
            {isAddModalOpen && <AddModal />}
            {isDeleteModalOpen && < DeleteModal />}
        </div >
    )
}




export default BoardManage;