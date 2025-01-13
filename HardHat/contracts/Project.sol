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

    mapping(address => bool) public students;
    mapping(address => bool) public visitors;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized access");
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender], "Not authorized as student");
        _;
    }

    modifier onlyVisitor() {
        require(visitors[msg.sender], "Not authorized as visitor");
        _;
    }

    Project[] public projects;

    event RegisteredAsStudent(address indexed user);
    event RegisteredAsVisitor(address indexed user);

    function registerAsStudent() public {
        require(msg.sender != admin, "Admin cannot register as student");
        students[msg.sender] = true;
        emit RegisteredAsStudent(msg.sender);
    }

    function registerAsVisitor() public {
        require(msg.sender != admin, "Admin cannot register as visitor");
        visitors[msg.sender] = true;
        emit RegisteredAsVisitor(msg.sender);
    }

    function submitProject(
        string memory _title,
        string memory _description,
        string memory _img
    ) public onlyStudent {
        uint256 projectId = projects.length;
        projects.push(
            Project({
                id: projectId,
                creator: msg.sender,
                title: _title,
                description: _description,
                img: _img,
                votes: 0
            })
        );
    }

    function vote(uint256 projectId) public onlyVisitor {
        require(projectId < projects.length, "Invalid project ID");
        projects[projectId].votes += 1;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}
