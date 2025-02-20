import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { memo } from "react"
import { useFirebaseAuth } from "../../context/FirebaseAuthContext"
import { vscode } from "../../utils/vscode"

type AccountViewProps = {
	onDone: () => void
}

const AccountView = ({ onDone }: AccountViewProps) => {
	const { user, handleSignOut } = useFirebaseAuth()

	const handleLogin = () => {
		vscode.postMessage({ type: "accountLoginClicked" })
	}

	const handleLogout = () => {
		// First notify extension to clear API keys and state
		vscode.postMessage({ type: "accountLogoutClicked" })
		// Then sign out of Firebase
		handleSignOut()
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				padding: "10px 0px 0px 20px",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "17px",
					paddingRight: 17,
				}}>
				<h3 style={{ color: "var(--vscode-foreground)", margin: 0 }}>Cline Account</h3>
				<VSCodeButton onClick={onDone}>Done</VSCodeButton>
			</div>
			<div
				style={{
					flexGrow: 1,
					overflowY: "scroll",
					paddingRight: 8,
					display: "flex",
					flexDirection: "column",
				}}>
				<div style={{ marginBottom: 5 }}>
					{user ? (
						<>
							{user.photoURL && (
								<img
									src={user.photoURL}
									alt="Profile"
									style={{
										width: 48,
										height: 48,
										borderRadius: "50%",
										marginBottom: 10,
									}}
								/>
							)}
							<div style={{ fontSize: "14px", marginBottom: 10 }}>
								{user.displayName && <div>{user.displayName}</div>}
								{user.email && <div>{user.email}</div>}
							</div>
							<VSCodeButton onClick={handleLogout}>Log out</VSCodeButton>
						</>
					) : (
						<VSCodeButton onClick={handleLogin}>Log in to Cline</VSCodeButton>
					)}
				</div>
			</div>
		</div>
	)
}

export default memo(AccountView)
