"use client";

import LaptopIcon from "@mui/icons-material/Laptop";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function ConversationCover() {
	return (
		<div className="flex flex-grow flex-col items-center bg-sky-300 px-12 text-slate-700">
			<div className="flex max-w-lg flex-grow flex-col items-center justify-center">
				<LaptopIcon sx={{ fontSize: 160 }} />

				<h1 className="font-medium">NextJS Chat App</h1>

				<p className="text-center">
					Real time chat application built with NextJS 13 + Socket.io
					+ MongoDB.
				</p>
			</div>

			<div className="my-4">
				<p className="text-lg font-medium italic">
					By Javier Villegas | Web Developer
				</p>

				<ul className="flex flex-row justify-center gap-4">
					<li>
						<a
							href="https://www.linkedin.com/in/vlja/"
							target="_blank"
						>
							<LinkedInIcon sx={{ fontSize: 36 }} />
						</a>
					</li>

					<li>
						<a href="https://github.com/jvillegasl" target="_blank">
							<GitHubIcon sx={{ fontSize: 36 }} />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
