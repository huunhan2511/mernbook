import PropTypes from "prop-types";
import React from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import teamMemberData from "../../data/team-members/team-member-one.json";
import TeamMemberOneSingle from "../../components/team-member/TeamMemberOneSingle";

const TeamMemberOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`team-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitle
          titleText="Thành viên"
          positionClass="text-center"
          spaceClass="mb-60"
        />

        <div className="row justify-content-center">
          {teamMemberData &&
            teamMemberData.map((single, key) => {
              return (
                <TeamMemberOneSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

TeamMemberOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TeamMemberOne;
