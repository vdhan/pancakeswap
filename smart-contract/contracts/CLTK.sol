// SPDX-License-Identifier: GPL-3.0-or-later
/// @author Vũ Đắc Hoàng Ân
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CLTK is IERC20, Ownable {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint private _totalSupply;

    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    constructor() {
        _name = "Carnelian";
        _symbol = "CLTK";
        _decimals = 10;
        _totalSupply = 10000000000 * 10 ** _decimals;
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint) {
        return _totalSupply;
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    function balanceOf(address account) external view returns (uint) {
        return _balances[account];
    }

    function allowance(address owner, address spender) external view returns (uint) {
        return _allowances[owner][spender];
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint amount) external returns (bool) {
        address msgSender = _msgSender();
        _transfer(sender, recipient, amount);
        _approve(sender, msgSender, _allowances[sender][msgSender] - amount);
        return true;
    }

    function increaseAllowance(address spender, uint addedValue) public returns (bool) {
        address msgSender = _msgSender();
        _approve(msgSender, spender, _allowances[msgSender][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint subtractedValue) public returns (bool) {
        address msgSender = _msgSender();
        _approve(msgSender, spender, _allowances[msgSender][spender] - subtractedValue);
        return true;
    }

    function mint(uint amount) public onlyOwner returns (bool) {
        _mint(_msgSender(), amount);
        return true;
    }

    function burn(uint amount) public returns (bool) {
        _burn(_msgSender(), amount);
        return true;
    }

    function _mint(address account, uint amount) internal {
        require(account != address(0), "Mint to zero address");
        _totalSupply = _totalSupply + amount;
        _balances[account] = _balances[account] + amount;
        emit Transfer(address(0), account, amount);
    }

    function _transfer(address sender, address recipient, uint amount) internal {
        require(sender != address(0), "Transfer from zero address");
        require(recipient != address(0), "Transfer to zero address");

        _balances[sender] = _balances[sender] - amount;
        _balances[recipient] = _balances[recipient] + amount;
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address owner, address spender, uint amount) internal {
        require(owner != address(0), "Approve from zero address");
        require(spender != address(0), "Approve to zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _burn(address account, uint amount) internal {
        require(account != address(0), "Burn from zero address");
        _balances[account] = _balances[account] - amount;
        _totalSupply = _totalSupply - amount;
        emit Transfer(account, address(0), amount);
    }

    function _burnFrom(address account, uint amount) internal {
        address msgSender = _msgSender();
        _burn(account, amount);
        _approve(account, msgSender, _allowances[account][msgSender] - amount);
    }
}