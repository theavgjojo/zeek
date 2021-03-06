%include binpac.pac
%include zeek.pac

%extern{
	#include "analyzer/protocol/rdp/events.bif.h"
%}

analyzer RDP withcontext {
	connection: RDP_Conn;
	flow:       RDP_Flow;
};

# Our connection consists of two flows, one in each direction.
connection RDP_Conn(zeek_analyzer: ZeekAnalyzer) {
	upflow   = RDP_Flow(true);
	downflow = RDP_Flow(false);
};

%include rdp-protocol.pac

flow RDP_Flow(is_orig: bool) {
	flowunit = TPKT(is_orig) withcontext(connection, this);
};

%include rdp-analyzer.pac
