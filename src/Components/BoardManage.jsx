import { useState } from "react";
import PersonCard from "../components/PersonCard";
import api from "../services/api";

function BoardManage(props) {
    const { type, personInfoList, onButtonClick } = props
    const today = new Date()

    /* 모달 on off를 위한 변수 */
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [personInfo, setPersonInfo] = useState({ userName: "더미" });
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
        const [dataForm, setdataForm] = useState({
            person_name: '',
            admin_pw: ''
        });
        const handleChange = (e) => {
            const { name, value } = e.target;

            setdataForm(prev => ({
                ...prev,
                [name]: value
            }));
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await api.addPerson(dataForm);
                handleAddModal(false)
            } catch (err) {
            } finally {
            }
        }

        return (
            <div className={`modal ${isAddModalOpen && "open"}`} >
                <form className="side-main" onSubmit={handleSubmit}>
                    <input
                        className="user-input"
                        type="text"
                        placeholder="추가할 이름"
                        value={dataForm.person_name}
                        onChange={handleChange}
                        id="person_name"
                        name="person_name"
                    />
                    <input
                        className="user-input"
                        type="password"
                        placeholder="관리자 암호"
                        value={dataForm.admin_pw}
                        onChange={handleChange}
                        id="admin_pw"
                        name="admin_pw"
                    />
                    <button type="submit"> 추가</button >
                    <button type="button" onClick={() => handleAddModal(false)}>취소</button>
                </form>
            </div >
        )
    }

    function DeleteModal() {
        return (
            <div className={`modal ${isDeleteModalOpen && "open"}`}>
                {personInfo.userName} 직원을 삭제하시겠습니까 ?

                <button onClick={() => yesButtonClick(personInfo)}>예</button>
                <button onClick={() => handleDeleteModal(false)}>아니요</button>
            </div >
        )
    }

    return (
        <div className="box">
            <div className="box-top">
                <div>{type.name}</div>
                <div>7명</div>
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
            <AddModal />
            <DeleteModal />
        </div >
    )
}

export default BoardManage;