// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract ProjectFair {
    struct Project {
        uint256 id;
        address creator;
        string title;
        string description;
        string img;
        uint256 votes;

    }

    enum Role { None, Student, Visitor }
    mapping(address => Role) public roles;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized access");
        _;
    }

    modifier onlyRole(Role requiredRole) {
        require(roles[msg.sender] == requiredRole, "Not authorized");
        _;
    }

    Project[] public projects;

    event Registered(address indexed user, Role role);

    function register(Role role) public {
        require(msg.sender != admin,"You are admin" ); 
        require(roles[msg.sender] == Role.None, "Already registered");
        require(role != Role.None, "Invalid role");
        roles[msg.sender] = role;
        emit Registered(msg.sender, role);
    }

    function submitProject(string memory _title,string memory _description, string memory _img) public onlyRole(Role.Student) {
        uint256 projectId = projects.length;
        projects.push(Project({
            id: projectId,
            creator: msg.sender,
            title: _title,
            description: _description,
            img: _img,
            votes: 0
        }));
    }

    function vote(uint256 projectId) public onlyRole(Role.Visitor) {
        require(projectId < projects.length, "Invalid project ID");
        projects[projectId].votes += 1;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}
