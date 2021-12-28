import React from 'react'
import { Row, Col } from 'antd'
import './footer.css'

export default function Footer() {
	return (
		<Row style={{backgroundColor: 'var(--black-bg)'}}>
			<Col span={16} offset={4} className='footer-above'>
				<div>
					<h3>About</h3>
					<p>Online & physical bead shop with the best beads and beading supplies in Zimbabwe ✓ Over 9000 beads for jewelry making ✓ Glass beads ✓ Beading supplies and much more!</p>
					<img src="https://seamaf.com/frontend/img/cards.png" alt="image"
						style={{width: '100%', display: 'block'}} />
				</div>
				<div>
					<h3>USEFUL LINKS</h3>
					<ul className='footer-useful-list'>
						<li>About Us</li>
						<li>Support</li>
						<li>Track Orders</li>
						<li>Term of Use</li>
						<li>Shipping</li>
						<li>Privacy Policy</li>
						<li>Contact</li>
						<li>Our Services</li>
						<li>My Orders</li>
						<li>Blog</li>
					</ul>
				</div>
				<div>
					<h3>BLOG</h3>
					<p>No Blog Here</p>
				</div>
				<div className='footer-contact'>
					<h3>CONTACT</h3>
					<div>
						<span>C.</span>
							<p>RVM SeaMaf</p>
					</div>
					<div>
						<span>B.</span>
							<p>108 Chinhoyi Street, Central Business District, Harare Zimbabwe</p>
					</div>
					<div>
						<span>T.</span>
							<p>+263782149840</p>
					</div>
					<div>
						<span>E.</span>
							<p>rvmseamaf@gmail.com</p>
					</div>
				</div>
			</Col>
		</Row>
	)
}
