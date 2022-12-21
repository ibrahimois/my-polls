import React from "react";
import { connect } from "react-redux";

function Leaderboard({ sortedUsers }) {
  console.log(sortedUsers)
  return (
    <table
      style={{
        border: "1px solid black",
        transform: "translateX(45vw)",
      }}
    >
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      {sortedUsers.map((user, index) => (
        <tbody key={index}>
          <tr>
            <td><img src={user.avatarURL} alt="users avatar!" /> {user.name}</td>
            <td>{user.answersLength}</td>
            <td>{user.questionsLength}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

const mapStateToProps = ({ users }) => {
  const usersWithSortingValues = Object.values(users).map((user) => {
    const answersLength = Object.keys(user.answers).length;
    const questionsLength = user.questions.length;
    return {
      ...user,
      answersLength,
      questionsLength,
    };
  });
  const sortedUsers = usersWithSortingValues.sort((a, b) => {
    if (a.answersLength !== b.answersLength) {
      return b.answersLength - a.answersLength;
    }
    if (a.questionsLength !== b.questionsLength) {
      return b.questionsLength < a.questionsLength ? -1 : 1;
    }
    return 0;
  });
  return {
    sortedUsers,
  };
};

export default connect(mapStateToProps)(Leaderboard);
