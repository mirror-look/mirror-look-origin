import axios from 'axios';
import { useEffect, useState } from 'react';

import AgreementModal from '../components/common/AgreementModal';

function OAuthRedirectHandler() {
  const [modalOpen, setModalOpen] = useState();
  const [agreement, setAgreement] = useState();
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  const modalTitle = '위치 정보 제공 동의';
  const modalComment =
    'Mirror-Look은 날씨 기반 추천 서비스예요. 저희가 위치 정보를 열람해도 될까요?';
  setModalOpen(true);
  useEffect(() => {
    if (!!code & !!agreement) {
      let data = { agreement: agreement };
      axios
        .post(`http://localhost:5000/login?code=${code}`, data)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      {modalOpen === true ? (
        <AgreementModal
          setAgreement={setAgreement}
          modalTitle={modalTitle}
          modalComment={modalComment}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default OAuthRedirectHandler;
