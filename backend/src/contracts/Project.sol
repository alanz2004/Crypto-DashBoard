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
        string ipfsHash;
        string fileName;
    }

    Member[] private members;
    File[] private files;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(string memory _name, address _admin) {
        name = _name;
        admin = _admin;
    }

    // ---------- Member functions ----------

    function addMember(address _wallet, string memory _role) public onlyAdmin {
        members.push(Member(_wallet, _role));
    }

    function getMemberCount() public view returns (uint256) {
        return members.length;
    }

    function getMember(uint256 index) public view returns (address wallet, string memory role) {
        require(index < members.length, "Index out of bounds");
        Member storage m = members[index];
        return (m.wallet, m.role);
    }

    // ---------- File functions ----------

    function addFile(string memory _ipfsHash, string memory _fileName) public onlyAdmin {
        files.push(File(_ipfsHash, _fileName));
    }

    function getFileCount() public view returns (uint256) {
        return files.length;
    }

    function getFile(uint256 index) public view returns (string memory ipfsHash, string memory fileName) {
        require(index < files.length, "Index out of bounds");
        File storage f = files[index];
        return (f.ipfsHash, f.fileName);
    }
}

