import { useState } from "react";
import PersonCard from "../components/PersonCard";
import api from "../services/api";

function BoardManage(props) {
    const { type, personInfoList, onButtonClick, onAddPerson } = props
    const today = new Date()

    /* 모달 on off를 위한 변수 */
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [personInfo, setPersonInfo] = useState({ userName: "더미" });
    const [addError, setAddError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddModal = (bool) => {
        setIsAddModalOpen(bool)
        if (!bool) setAddError("");
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
        const [dataForm, setDataForm] = useState({
            person_name: '',
            admin_pw: ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;

            setDataForm(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setAddError("");
            setIsSubmitting(true);

            try {
                await onAddPerson(dataForm);
                handleAddModal(false);
            } catch (err) {
                setAddError(err.response?.data?.message || "직원 추가 중 오류가 발생했습니다.");
            } finally {
                setIsSubmitting(false);
            }
        }

        return (
            <div className={`modal ${isAddModalOpen ? "open" : ""}`} >
                <form className="side-main" onSubmit={handleSubmit}>
                    <h3>인원 추가</h3>
                    {addError && <div className="error-message">{addError}</div>}
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
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "처리 중..." : "추가"}
                    </button >
                    <button type="button" onClick={() => handleAddModal(false)}>취소</button>
                </form>
            </div >
        )
    }

    function DeleteModal() {
        return (
            <div className={`modal ${isDeleteModalOpen ? "open" : ""}`}>
                <div className="side-main">
                    <h3>인원 삭제</h3>
                    <p>{personInfo.userName} 직원을 삭제하시겠습니까?</p>
                    <button onClick={() => yesButtonClick(personInfo)}>예</button>
                    <button onClick={() => handleDeleteModal(false)}>아니요</button>
                </div>
            </div >
        )
    }

    return (
        <div className="box">
            <div className="box-top">
                <div>{type.name}</div>
                <div>{personInfoList.length}명</div>
            </div>
            <div className="box-mid">
                <div className="deck">
                    {personInfoList.length === 0 ? (
                        <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
                            현재 등록된 인원이 없습니다.
                        </div>
                    ) : (
                        personInfoList.map((personInfo, index) => (
                            <PersonCard
                                key={index}
                                personInfo={personInfo}
                                button={type.button}
                                onButtonClick={minusButtonClick}
                            />
                        ))
                    )}
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