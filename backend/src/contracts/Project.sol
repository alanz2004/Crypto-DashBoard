// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    string public name;
    address public admin;

    struct Member {
        address wallet;
        string role;
    }

    struct File {
        string ipfsHash; // or encrypted storage reference
        string fileName;
    }

    Member[] public members;
    File[] public files;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(string memory _name, address _admin) {
        name = _name;
        admin = _admin;
    }

    function addMember(address _wallet, string memory _role) public onlyAdmin {
        members.push(Member(_wallet, _role));
    }

    function getMembers() public view returns (Member[] memory) {
        return members;
    }

    function addFile(string memory _ipfsHash, string memory _fileName) public onlyAdmin {
        files.push(File(_ipfsHash, _fileName));
    }

    function getFiles() public view returns (File[] memory) {
        return files;
    }
}
