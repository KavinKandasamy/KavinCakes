﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Data;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserDbContext _context;
        public UserController(IConfiguration configuration,UserDbContext context)
        {
            _configuration = configuration;
            _context= context;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok("Ok");
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if(_context.Users.Where(u => u.Email == user.Email).FirstOrDefault() != null)
            {
                return Ok("User Already Exist");
            }
            user.MemberSince = DateTime.Now;
            _context.Users.Add(user);
            _context.SaveChanges(); 
            return Ok("User Registered Successfully");
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult Login(Login user)
        {
            var userAvailable = _context.Users.Where(u => u.Email == user.Email && u.Pwd == user.Pwd).FirstOrDefault(); 
            if(userAvailable != null)
            {
                return Ok(
                    new JwtService(_configuration).GenerateToken(
                        userAvailable.UserID.ToString(),
                        userAvailable.FirstName,
                        userAvailable.LastName,
                        userAvailable.Email,
                        userAvailable.Mobile,
                        userAvailable.Gender
                        )
                    );
            }
            return Ok("Login Failed");
        }
    }
}
