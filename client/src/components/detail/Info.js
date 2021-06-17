export function Info({ date, username }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>
        {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8)}일
      </h3>
      <h3>{username} 님은 이런 옷을 입었네요!</h3>
    </div>
  );
}
