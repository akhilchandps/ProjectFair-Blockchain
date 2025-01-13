// const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
// const { expect } = require('chai');
// const { ethers } = require('hardhat');

// describe('ProjectFair', function () {
//   async function deployContract() {
//     const [admin, student, visitor] = await ethers.getSigners();
//     const ProjectFair = await ethers.getContractFactory('ProjectFair');
//     const projectFair = await ProjectFair.deploy();
//     return { projectFair, admin, student, visitor };
//   }

//   it("should deploy the contract and set the admin", async function () {
//     const { projectFair, admin } = await loadFixture(deployContract);
//     expect(await projectFair.admin()).to.equal(admin.address);
//   });

//   it("should allow users to register with a valid role", async function () {
//     const { projectFair, student } = await loadFixture(deployContract);
//     await projectFair.connect(student).register(1); // 1 = Role.Student
//     expect(await projectFair.roles(student.address)).to.equal(1);
//   });

//   it("should not allow admin to register as a different role", async function () {
//     const { projectFair, admin } = await loadFixture(deployContract);
//     await expect(projectFair.connect(admin).register(1)).to.be.revertedWith("You are admin");
//   });

//   it("should allow a student to submit a project", async function () {
//     const { projectFair, student } = await loadFixture(deployContract);
//     await projectFair.connect(student).register(1); // Register as Student
//     await projectFair.connect(student).submitProject("Project 1", "Description 1", "ipfs://hash1");
//     const project = await projectFair.projects(0);
//     expect(project.title).to.equal("Project 1");
//     expect(project.description).to.equal("Description 1");
//     expect(project.img).to.equal("ipfs://hash1");
//     expect(project.votes).to.equal(0);
//   });

//   it("should not allow non-students to submit a project", async function () {
//     const { projectFair, visitor } = await loadFixture(deployContract);
//     await projectFair.connect(visitor).register(2); // Register as Visitor
//     await expect(
//       projectFair.connect(visitor).submitProject("Project 2", "Description 2", "ipfs://hash2")
//     ).to.be.revertedWith("Not authorized");
//   });

//   it("should allow a visitor to vote for a project", async function () {
//     const { projectFair, student, visitor } = await loadFixture(deployContract);
//     await projectFair.connect(student).register(1); // Register as Student
//     await projectFair.connect(student).submitProject("Project 1", "Description 1", "ipfs://hash1");

//     await projectFair.connect(visitor).register(2); // Register as Visitor
//     await projectFair.connect(visitor).vote(0); // Vote for Project 0

//     const project = await projectFair.projects(0);
//     expect(project.votes).to.equal(1);
//   });

//   it("should not allow non-visitors to vote", async function () {
//     const { projectFair, student } = await loadFixture(deployContract);
//     await projectFair.connect(student).register(1); // Register as Student
//     await expect(projectFair.connect(student).vote(0)).to.be.revertedWith("Not authorized");
//   });

//   it("should not allow voting for an invalid project ID", async function () {
//     const { projectFair, visitor } = await loadFixture(deployContract);
//     await projectFair.connect(visitor).register(2); // Register as Visitor
//     await expect(projectFair.connect(visitor).vote(999)).to.be.revertedWith("Invalid project ID");
//   });
// });
